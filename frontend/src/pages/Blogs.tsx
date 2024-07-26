import { Appbar } from "../components/Appbar";
import { useBlogs} from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { BlogCard } from "../components/BlogCard";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>
            <Appbar /> 
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }
    console.log(blogs);
    return <div>
        <Appbar />
        <div  className="flex justify-center">
            <div>
                {blogs && blogs.length > 0 ? (
                    blogs.map(blog => (
                        <BlogCard
                            key={blog.id}
                            id={blog.id}
                            // authorName="Anonymous"
                            authorName={blog.author?.name || "Anonymous"}
                            title={blog.title}
                            content={blog.content}
                            publishedDate="2nd Feb 2024"
                        />
                    ))
                ) : (
                    <p>No blogs available.</p>
                )}

            </div>
        </div>
    </div>
}

