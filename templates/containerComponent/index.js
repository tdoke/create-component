import { connect } from 'react-redux'
import componentname from "./componentname.component";

const mapStateToProps = (state) => {
  return {
     /** 
      * pick data from redux state
     */
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
     /** 
      * pick actions from redux state
     */
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(componentname);

