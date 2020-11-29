import PrevSessionItem from './PrevSessionItem';

const PrevSessionsList = (props) => {

  return props.sessionsList.map(session => {
    return (

      <PrevSessionItem 
        key={session.sessionid}
        game={session.name}
        sessionID={session.sessionid}
        date={session.date}
        difficulty={session.difficulty}
        gameLogo={session.logo}
        setCurrentProfile={props.setCurrentProfile}
        setFavouriteGame={props.setFavouriteGame}
        setPreviousSessions={props.setPreviousSessions}
        showSessions={props.showSessions}
        setShowSessions={props.setShowSessions}
        token={props.token}
      
      />
    )
  })

}

export default PrevSessionsList;