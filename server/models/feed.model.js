

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const FeedsSchema = new mongoose.Schema({

    author: { type: Schema.Types.ObjectId, ref: 'User' },
    authorName: String,
    feedContent: String,
    likes: Number,
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
 
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
    imgPath: String,
    OgFeed: { type: Schema.Types.ObjectId, ref: 'Feeds' },
    authorImg: String,  /// MAKE REF to user for most recent img

    commentCount: Number

}, { timestamps: true }
)


const CommentSchema = new mongoose.Schema({
    authorId: { type: Schema.Types.ObjectId, ref: 'User' },
    authorName: String,
    content: String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
    likes: Number,
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    OgFeed: { type: Schema.Types.ObjectId, ref: 'Feeds' },
    OgComment: { type: Schema.Types.ObjectId, ref: 'Comments' },
    commentCount: Number,
    parent: { type: Schema.Types.ObjectId, ref: 'Comments' },
    parentDoc: { type: Schema.Types.ObjectId, ref: 'Comments' },
    parentAuthorId: { type: Schema.Types.ObjectId, ref: 'User' }, /// for Reply vs add comment
    parentAuthorName: String,
    nestLevel: Number,
    nestedPath: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
    authorImg: String,  /// MAKE REF to user for most recent img


}, { timestamps: true }
    // ))
)

function autoPopulateComments(next) {
    this.populate('comments')
    next()
}

FeedsSchema.post("save", function () {
    console.log("post attempt")

})

CommentSchema
    .pre('findOne', autoPopulateComments)
    .pre('find', autoPopulateComments)


// CommentSchema.pre('find', function (next) {
//     if (this.options._recursed) {
//         return next();
//     }
//     this.populate({ path: 'comments', options: { _recursed: true } });
//     next();
// });

const Comments = mongoose.model("Comments", CommentSchema)
const Feeds = mongoose.model("Feeds", FeedsSchema)

// module.exports = Feeds
module.exports = { Comments, Feeds } 