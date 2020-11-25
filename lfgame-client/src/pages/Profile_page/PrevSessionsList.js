import PrevSessionItem from './PrevSessionItem';

const PrevSessionsList = (props) => {

  const currentUser = props.currentUser;

  return props.sessionsList.map(session => {
    return (

      <PrevSessionItem 
        key={session.id}
        sessionID={session.sessionid}
        game={session.name}
        currentUser={currentUser}
        
      
      
      />
    )
  })

}

export default PrevSessionsList;