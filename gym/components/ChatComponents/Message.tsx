import React from 'react'; 
import { MessageInterface } from '@interfaces/MessageInterface';

interface Props { 
    message: MessageInterface | Object, 
    type: string, 
}
const Message = ({ message, type }: Props) => {
  return (
    <div>Message</div>
  )
}

export default Message