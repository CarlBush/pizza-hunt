const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ReplySchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment's _id field
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody: {
            type: String,
            required: true,
            trim: true
        },
        writtenBy: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const CommentSchema = new Schema ({
    writtenBy: {
        type: String
    },

    commentBody: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    //associate replies with comments.. nested directly in the comments document and not referred to.
    replies: [ReplySchema]

},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

//VIRTUALS | (GETS TOTAL COUNT OF REPLIES ON RETRIEVAL)
CommentSchema.virtual("replyCount").get(function () {
    return this.replies.length;
});

//Creates the Comment model using the CommentSchema
const Comment = model("Comment", CommentSchema);
module.exports = Comment;