import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './css/style.css';
import $ from "jquery";

class TableInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tableInfo: [],
      sort: 0
    };
    this.addNewLine = this.addNewLine.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions() {
    $.ajax({
      method: 'GET',
      url: '/data/tableinfo.json',
      success: (tableinfo) => {
        tableinfo.map(edit => {
          edit.statusEdit = 1;
          edit.statusDelete = 1;
          return edit;
        })
        tableinfo.sort((a,b)=> a.id-b.id);
        this.setState({tableInfo: tableinfo});
      }
    });
  }

  addNewLine() {
    let tempTableInfo = this.state.tableInfo
    tempTableInfo.map((a, i) => {
      return a.id = i+1;
    })
    let newAddValue = {
      id: this.state.tableInfo.length + 1,
      state: '',
      large_city: '',
      statehood: '',
      population: '',
      area: '',
      statusEdit: 0,
      statusDelete: 1
    }
    this.setState({
      tableInfo: [...this.state.tableInfo,newAddValue]
    });
  }

  actionCurentLine(id, editDelete) {
    let tempTableInfo = this.state.tableInfo
    if (editDelete === 5) {
      tempTableInfo = tempTableInfo.filter(a => {
        return a.id !== id;
      })
    } else {
      tempTableInfo.map(a => {
        if (a.id === id) {
          if (editDelete === 1) { a.statusEdit = 0; }
          else if (editDelete === 2) { a.statusDelete = 0; }
          else if (editDelete === 3) { a.statusEdit = 1; }
          else if (editDelete === 4) { a.statusDelete = 1; }
        }
        return a;
      })
    }
    this.setState({tableInfo: tempTableInfo});
  }

  changeCurentLine(id, key, e) {
    let tempTableInfo = this.state.tableInfo
    tempTableInfo.map(a => {
      if (a.id === id) {
        if (key === 0) {a.state = e.target.value;}
        if (key === 1) {a.large_city = e.target.value;}
        if (key === 2) {a.statehood = e.target.value;}
        if (key === 3) {a.population = e.target.value;}
        if (key === 4) {a.area = e.target.value;}
      }
      return a;
    })
    this.setState({tableInfo: tempTableInfo});
  }

  sortLines(id) {

    let tempTableInfo = this.state.tableInfo;

    function alfaSort(a, b) {
      var x = a.toLowerCase();
      var y = b.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    }

    tempTableInfo.sort((a, b) => {

      if (id === 1) {
        return alfaSort(a.state, b.state);
      } else if (id === 2) {
        return alfaSort(b.state, a.state);
      } else if (id === 3) {
        return alfaSort(a.large_city, b.large_city);
      } else if (id === 4) {
        return alfaSort(b.large_city, a.large_city);
      } else if (id === 5) {
        return alfaSort(a.statehood, b.statehood);
      } else if (id === 6) {
        return alfaSort(b.statehood, a.statehood);
      } else if (id === 7) {
        return a.population - b.population;
      } else if (id === 8) {
        return b.population - a.population;
      } else if (id === 9) {
        return a.area - b.area;
      } else if (id === 10) {
        return b.area - a.area;
      } else {
        return a.id - b.id;
      }
    })
    this.setState({tableInfo: tempTableInfo, sort: id});
  }

  render() {
    return (
      <div className="container">
        <div className="row header">
          <div className="col-md-12 col-lg-12 col-sm-12">
            <h2 className="pull-left">Table Info</h2>
            <h5 className="nquest pull-right">{this.state.tableInfo.length} Records</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-12 col-sm-12">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{this.state.sort!==1 && <span onClick={()=> this.sortLines(1)} className="glyphicon glyphicon-sort-by-alphabet"></span>}{this.state.sort===1 && <span onClick={()=> this.sortLines(2)} className="glyphicon glyphicon-sort-by-alphabet-alt"></span>} States</th>
                    <th>{this.state.sort!==3 && <span onClick={()=> this.sortLines(3)} className="glyphicon glyphicon-sort-by-alphabet"></span>}{this.state.sort===3 && <span onClick={()=> this.sortLines(4)} className="glyphicon glyphicon-sort-by-alphabet-alt"></span>} Largest City</th>
                    <th>{this.state.sort!==5 && <span onClick={()=> this.sortLines(5)} className="glyphicon glyphicon-sort-by-attributes"></span>}{this.state.sort===5 && <span onClick={()=> this.sortLines(6)} className="glyphicon glyphicon-sort-by-attributes-alt"></span>} Statehood</th>
                    <th>{this.state.sort!==7 && <span onClick={()=> this.sortLines(7)} className="glyphicon glyphicon-sort-by-order"></span>}{this.state.sort===7 && <span onClick={()=> this.sortLines(8)} className="glyphicon glyphicon-sort-by-order-alt"></span>} Population</th>
                    <th>{this.state.sort!==9 && <span onClick={()=> this.sortLines(9)} className="glyphicon glyphicon-sort-by-order"></span>}{this.state.sort===9 && <span onClick={()=> this.sortLines(10)} className="glyphicon glyphicon-sort-by-order-alt"></span>} Area</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tableInfo.map( t =>
                    <tr key={t.id}>
                      <td>{t.id}</td>
                      <td>{t.statusEdit ? (<div>{t.state}</div>) : (<input className="form-table" onChange={(e) => this.changeCurentLine(t.id,0,e)} type="text" value={t.state}/>)}</td>
                      <td>{t.statusEdit ? (<div>{t.large_city}</div>) : (<input className="form-table" onChange={(e) => this.changeCurentLine(t.id,1,e)} type="text" value={t.large_city}/>)}</td>
                      <td>{t.statusEdit ? (<div>{t.statehood}</div>) : (<input className="form-table" onChange={(e) => this.changeCurentLine(t.id,2,e)} type="text" value={t.statehood}/>)}</td>
                      <td>{t.statusEdit ? (<div>{t.population.toLocaleString()}</div>) : (<input className="form-table" onChange={(e) => this.changeCurentLine(t.id,3,e)} type="text" value={t.population}/>)}</td>
                      <td>{t.statusEdit ? (<div>{t.area.toLocaleString()}</div>) : (<input className="form-table" onChange={(e) => this.changeCurentLine(t.id,4,e)} type="text" value={t.area}/>)}</td>
                      {t.statusDelete ? (
                      <td>
                        {t.statusEdit ? ( <button onClick={() => this.actionCurentLine(t.id,1)} className="btn btn-warning btn-xs">Edit</button>
                                    ) : ( <button onClick={() => this.actionCurentLine(t.id,3)} className="btn btn-info btn-xs">Done</button>)
                        }
                        <button onClick={() => this.actionCurentLine(t.id,2)} className="btn btn-danger btn-xs">Delete</button>
                      </td>
                      ) : (
                      <td><span>Sure?</span><button onClick={() => this.actionCurentLine(t.id,4)} className="btn btn-info btn-xs">No</button><button onClick={() => this.actionCurentLine(t.id,5)} className="btn btn-danger btn-xs">Yes</button></td>
                      )}
                    </tr>
                  )}
                </tbody>
               </table>
              <div className="text-center"><button onClick={this.addNewLine} className="btn btn-info btn-md">Add New Line</button></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<TableInfo/>, document.getElementById('root'));
