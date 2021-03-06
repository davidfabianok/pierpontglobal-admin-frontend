import { FuseUtils } from '@fuse';
import moment from 'moment';

class CommentModel {
  /**
     * Constructor
     */
  constructor(data) {
    const item = data || {};

    this.id = item.id || FuseUtils.generateGUID();
    this.type = 'comment';
    this.idMember = item.idMember || null;
    this.message = item.message || '';
    this.time = item.time || moment().format(moment.HTML5_FMT.DATE);
  }
}

export default CommentModel;
