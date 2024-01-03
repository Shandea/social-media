import React from 'react'

function FeedContainer() {
    return (
        <>
        
            <div
                id="FeedContainter"
                style={{
                    border: '2px red solid',
                    margin: '20px',
                    height: "fit-content",
                    display: 'flex',
                    flexDirection: 'column'
                }}>

                <div id="User Information"
                    style={{
                        border: '1px yellow solid',
                        justifyContent: 'space-between',
                        display: 'flex'
                    }}
                >
                    <div style={{ border: "1px red solid" }}>user</div>
                    <div style={{ border: "1px red solid" }}>follow user</div>
                    <div style={{ border: "1px red solid" }}>date sent</div>

                </div>

                <br />

                <div id="FeedContent"
                    style={{
                        border: '1px yellow solid',
                        height: '80vh',
                        height: "fit-content",

                    }}
                >

                    <div id="FeedImage"

                        style={{
                            border: 'solid black 2px',
                            display: 'flex',
                            justifyContent: 'center'

                        }}
                    >
                        if there is a image, render here,centered

                    </div>

                    <div id="FeedContent">feed content :
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. At corporis dolorum odio impedit sequi nam libero error deleniti? Reprehenderit illo iure, expedita quod voluptate dolores! Quos fugit inventore nesciunt maxime iste animi ratione earum error hic expedita alias, mollitia voluptas, unde accusantium cumque assumenda modi nisi omnis facere saepe delectus culpa distinctio. Fuga, amet? Sed veritatis recusandae facere quia maxime quae incidunt eum, quos nisi est corporis delectus. Pariatur neque quibusdam odio assumenda, porro iusto earum aliquid labore necessitatibus facere deleniti inventore natus optio non doloremque veniam omnis ab sint molestiae nam, illum veritatis? Aliquam qui ut illum voluptatibus alias.</div>

                </div>

                <br />

                {/*  this will be it own reusable comp as well, when add comment is clicked.. it expands to a area to add a comment... when Comments is clicked comment populate from the DB, and render as a component very similar to this one with the same actions, reply options, likes, etc */}
                <div
                    style={{
                        border: '1px yellow solid',
                        justifyContent: 'space-between',
                        display: 'flex'
                    }}
                >
                    <div style={{ border: "1px red solid" }}>likes</div>
                    <div style={{ border: "1px red solid" }}>comments</div>
                    <div style={{ border: "1px red solid" }}>add comment</div>




                </div>
            </div>
        
        
        
        </>
            )
}

export default FeedContainer