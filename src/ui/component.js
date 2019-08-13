import React from 'react' ;

class ScreenComponent extends React.Component
{
  navigation ( )
  {
    return this.props.navigation ;
  }


  store ()
  {
    return this.props.store || this.props.screenProps.store ;
  }


  params ( )
  {
    return this.props.navigation.state.params ;
  }
}

export default ScreenComponent ;
