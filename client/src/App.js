import "./App.css";
import UploadForm from "./component/UploadForm";
import UpdateForm from "./component/UpdateForm";
import View from "./component/View";
import DeleteForm from "./component/DeleteForm";
import ExportData from "./component/ExportData";

function App() {
  return (
    <div>
      <div>inventory application</div>
      <View />
      <ExportData />
      <UploadForm />
      <UpdateForm />
      <DeleteForm />
    </div>
  );
}

export default App;
