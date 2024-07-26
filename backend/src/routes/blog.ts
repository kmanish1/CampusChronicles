import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
export const blogRouter= new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables:{
        userId:string;
    }
}>();

blogRouter.use('/*', async (c, next) => {
	const token = c.req.header('authorization') || "";
	try {
	  const user = await verify(token, c.env.JWT_SECRET);
	  if (user) {
		//@ts-ignore
		c.set('userId', user.id);
		await next();
	  } else {
		c.status(403);
		return c.json({
		  msg: 'You are not authenticated',
		});
	  }
	} catch (err) {
	  c.status(403);
	  return c.json({
		msg: 'Invalid token',
	  });
	}
});

blogRouter.post('/', async(c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL	,
    }).$extends(withAccelerate());
    const authorId = c.get('userId');
    const body=await c.req.json();
    const post = await prisma.blog.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: Number(authorId)
		}
	});
    return c.json({
        id:post.id
    });

})

blogRouter.get('/bulk',async(c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const posts = await prisma.blog.findMany({
		select:{
			content:true,
			title:true,
			id:true,
			author:{
				select:{
					name:true
				}
			}
		}
	});

	return c.json(posts);
})

blogRouter.get('/:id', async(c) => {
	const id=c.req.param("id");
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	try{
		const blog=await prisma.blog.findFirst({
			where:{
				id:Number(id)
			},
			select:{
				id:true,
				title:true,
				content:true,
				author:{
					select:{
						name:true
					}
				}
			}
		})
		return c.json({
			blog
		});
	}catch(e){
		c.status(411);
		return c.json({
			message:"Error while fetching blog post"
		});
	}
})


blogRouter.put('/', async(c) => {
	const userId = Number(c.get('userId'));
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	prisma.blog.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
})

