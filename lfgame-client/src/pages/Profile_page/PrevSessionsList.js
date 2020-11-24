import PrevSessionItem from './PrevSessionItem';

const PrevSessionsList = (props) => {

  console.log(props);

  return props.sessionsList.map(session => {
    return (

      <PrevSessionItem 
        key={session.id}
        joinID={session.joinedid}
        game={session.name}
        
      
      
      />
    )
  })

}

export default PrevSessionsList;