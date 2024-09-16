export default function Blog(){
    const blog = {
        content: "this is a test",
        date_created: "1/1/1111",
        author: {last_name: "d", first_name:"k"},
        tags: ["#science", "#programing"], 
    }
    return (

        <>  <p>{blog.date_created}</p>
            <p>{blog.content}</p>
            <p>{`${blog.author.first_name} ${blog.author.last_name}`}</p>
        </>

    )
}