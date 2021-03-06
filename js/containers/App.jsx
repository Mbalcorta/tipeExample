import React, { Component } from 'react';
import { CONF } from '../config/index'
import Main from './Main.jsx'
import Footer from './Footer.jsx'
import Spinner from './Spinner.jsx'
import axios from 'axios'

class App extends Component {
   
    constructor(props) {
        super(props)

        this.state = {
            textContent: {
                header: null,
                subHeader: null,
                congressLanguage: null,
                main: null,
                disclaimer: null,
                formButton: null,
                modalHeader: null,
                modalText: null
            },
            loading: true
        }  
    }

    componentDidMount(){
        const { tipeAuth, tipeId } = CONF;
        window.scrollTo(0, 0);

        axios({
          method: "get",
          url: 'https://api.tipe.io/api/v1/document/5af33e3968f0a10013429fdc',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': tipeAuth,
            'Tipe-Id': tipeId
          }
        })
        .then(response => {
          const data = response.data
          this.setState({
            textContent:{
              header: data.blocks[0].value,
              subHeader: data.blocks[1].value,
              congressLanguage: data.blocks[2].value,
              main: data.blocks[3].value,
              disclaimer: data.blocks[4].value,
              formButton: data.blocks[5].value,
              modalHeader: data.blocks[6].value,
              modalText: data.blocks[7].value
            },
            loading: false
          })
        })
        .catch(console.error);

      }

    render() {
        
        const { header, subHeader, main, congressLanguage, disclaimer, formButton, modalHeader, modalText } = this.state.textContent
       
        return(
            <div>
                {
                    this.state.loading ? 
                    <div id="spinner" >
                        <Spinner/> 
                    </div>
                    :
                    <Main 
                    header={ header } 
                    subHeader={ subHeader} 
                    main={ main } 
                    congressLanguage={ congressLanguage } 
                    disclaimer={ disclaimer }
                    formButton={ formButton }
                    modalHeader={ modalHeader }
                    modalText = { modalText }
                    />
                }
                  <Footer />
            </div>
        )
    }
}

export default App;