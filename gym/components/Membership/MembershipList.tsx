import React from 'react'; 
import { MembershipInterface } from '@interfaces/MembershipInterface';

interface Props { 
    memberships: MembershipInterface []
}

const MembershipList = ({ memberships }: Props) => {
  return (
    <div>MembershipList</div>
  )
}

export default MembershipList