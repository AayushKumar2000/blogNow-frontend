import { Route, Router,Switch } from 'react-router-dom';
import history from './history';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/home';
import ProtectedRoute from './components/protectedRoute';
import ForgotPassword from './components/forgotPassword';
import SendMail from './components/sendMail';
import MyEditor from './components/editor'
import ShowEditorContent from './components/showEditorContent';
import EditorUi from './components/EditorUi';
import SavedDraft from './components/savedDrafts';

function App() {
  return  <>
  <Router history={history}>
    <Switch>
      <Route path="/signin" exact component={Signin} />
      <Route path="/signin/:mess" exact component={Signin} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/forgotPassword/sendemail" exact component={SendMail} />
      <Route path="/forgotPassword/:token" exact component={ForgotPassword} />
      <ProtectedRoute  path="/" exact component={Home} />
      {/* <Route path='/editor' exact component={MyEditor}/> */}
      {/* <Route path='/editor/write' exact component={EditorUi}/> */}
      <ProtectedRoute path='/editor/write/:draftID' exact component={EditorUi}/>
      <ProtectedRoute path='/drafts' exact component={SavedDraft}/>
      <ProtectedRoute path='/editor/show/:draftID' exact component={ShowEditorContent}/>
      <ProtectedRoute path='/editor/write' exact component={EditorUi}/> 
      <ProtectedRoute path='/editor/show' exact component={ShowEditorContent}/>
    </Switch>
  </Router>
  </>
}

export default App;
