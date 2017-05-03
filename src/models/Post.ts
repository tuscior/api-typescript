import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    required: true
  },
  slug: {
    type: String,
    default: '',
    required: true,
    unique: true,
    trim: true
  },
  content: {
    type: String,
    default: '',
    required: true,
    unique: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model('Post', PostSchema);