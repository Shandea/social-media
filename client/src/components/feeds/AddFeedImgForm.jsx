
const FeedAddImgForm = ({handleSelectedFiles, handleFeedSubmit}) => {



    return (
        <div id='FeedAddImgForm'>
            



            <div>
                <form >

                    <input type="file" 
                    style={{ 
                    
                    position: "absolute",
                zIndex: "3",
                top: "4px",
                right: "0.5px"
                
                }}
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