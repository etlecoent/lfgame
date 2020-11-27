import PrevSessionItem from './PrevSessionItem';

const PrevSessionsList = (props) => {

  const currentUser = props.currentUser;


  console.log("CHECK HERE FOR PROPS: ", props);
  return props.sessionsList.map(session => {
    return (

      <PrevSessionItem 
        key={session.id}
        game={session.name}
        sessionID={session.sessionid}
        date={session.date}
        difficulty={session.difficulty}
        gameLogo={session.logo}
        currentUser={currentUser}
        currentProfile={props.currentProfile}
        setCurrentProfile={props.setCurrentProfile}
        setFavouriteGame={props.setFavouriteGame}
        setPreviousSessions={props.setPreviousSessions}
        showSessions={props.showSessions}
        setShowSessions={props.setShowSessions}
        
      
      
      />
    )
  })

}

export default PrevSessionsList;