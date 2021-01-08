import { Route, Switch, useHistory } from "react-router-dom";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import MyFeed from './components/MyFeed';
import NewPost from './components/NewPost';
import { useContext, useEffect } from "react";
import { UserContext } from "./contexts";

export default function Routing(props){
    const {state,dispatch} = useContext(UserContext);
    const history = useHistory();
    
    useEffect(() => {
        console.log('In Routing.Js sessionstorage' + sessionStorage.getItem('user'))
        const user = sessionStorage.getItem('user');
        console.log('In Routing.Js ' + user);
        if(user){
            dispatch({type: 'User', payload: user});
            history.push('/');
        }else{
            history.push('/sign-in');
        }
    }, []);

    return (
        <Switch>
          <Route path='/' exact component={state ? MyFeed : Home} />
          <Route path='/sign-in' component={SignIn} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/myfeed' component={MyFeed} />
          <Route path='/new-post' component={NewPost} />
        </Switch>
    )
};