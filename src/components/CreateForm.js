

const CreateForm = ({onHandleCreate, title, author, url, onChangeTitle, onChangeAuthor, onChangeUrl})=>{    
    return(
        <div>
             <h1>Create</h1>         
            <form onSubmit={onHandleCreate}>
            <div>
            title <input  type="text"  value={title}  name="Title"   onChange={onChangeTitle}/>
            </div>
            <div>
            author <input  type="text"  value={author}  name="Author"  onChange={onChangeAuthor}/>
            </div>
            <div>
            url <input  type="text"  value={url}  name="Url"  onChange={onChangeUrl}/>
            </div>

            <button type="submit">create</button>
            </form>      
        </div>
    )  

}

export default CreateForm;