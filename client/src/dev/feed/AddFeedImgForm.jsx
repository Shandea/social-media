
const FeedAddImgForm = ({handleSelectedFiles, handleFeedSubmit}) => {



    return (
        <div id='FeedAddImgForm'>
            <p> FeedAddImgForm111 </p>



            <div>
                <form >

                    <input type="file"
                        onChange={(e) => handleSelectedFiles(e)}
                        accept="image/*"
                        
                        id="image"
                        name="image"></input>
                </form>
            </div>
        </div>
    )
};

export default FeedAddImgForm