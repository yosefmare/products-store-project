import { Schema, model} from 'mongoose';
import {BaseDocument} from '../types/UserAndRegisrationMethodeTypes'

const Tokens = new Schema({
userId: {
    type: Schema.Types.ObjectId
},

token:{
    type: String
}
}, { versionKey: false });

const TokensModal = model<BaseDocument>('tokens', Tokens);

export default TokensModal;