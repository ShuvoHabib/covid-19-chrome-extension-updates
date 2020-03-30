import React, { Component } from 'react'
import { CountryDropdown } from 'react-country-region-selector';

const API = 'https://corona.lmao.ninja/all';
const COUNTRY_NAME = 'https://corona.lmao.ninja/countries/'


export default class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cases: [],
      data: [],
      updated:'',
      isLoading: false,
      deaths:'',
      recovered: '',
      country: localStorage.getItem('country') || '',
      countryCases:'',
      countryCasesToday:'',
      countryCasesDeath:'',
      countryCasesRecovered:'',
      flag:'',
      error:''
    };
  }

  componentDidMount() {
    if(this.state.country){
      this.selectCountry(this.state.country);
    }

    fetch(API).then(result => result.json())
    .then((data) => {
      this.setState({
        cases: data.cases,
        deaths: data.deaths,
        recovered: data.recovered,
        updated: data.updated,
      })
    })
  }

  selectCountry (val) {
    localStorage.setItem('country', val);
    this.setState({ country: val });
    fetch(`${COUNTRY_NAME}${val}`).then(result => result.json())
    .then((data) => {
      this.setState({
        flag: data.countryInfo ? data.countryInfo.flag :'',
        countryCases: data.cases,
        countryCasesDeath: data.deaths,
        countryCasesRecovered: data.recovered,
        countryCasesToday: data.todayCases,
        error: data.message,
      })
    }).catch(e => this.setState({error: e.message}) )
  }
  
  render() {
    const { country, countryCasesToday, cases, deaths, recovered,  error, countryCases, countryCasesDeath, countryCasesRecovered } = this.state;
    return (
      <div className="">
        <div className="alert alert-primary" role="alert">
            CASES: <span className="cases">{cases}</span>,
            DEATHS: <span className="deaths">{deaths}</span>,
            <br />
            ACTIVE: <span className="cases">{cases - recovered}</span>,
            RECOVERED: <span className="recovered">{recovered}</span>
        </div>

        <h4>Select any country</h4>
        <CountryDropdown
          showDefaultOption={true}
          value={country}
          onChange={(val) => this.selectCountry(val)} 
        />
        <br/>
        {error && error}
        <br/>
        {countryCases && <div className="alert alert-info" role="alert">
          <div className="card card-width">
            <img width="100%" src={this.state.flag} />
            <div className="card-body">
              <p>CASES: <span className="cases">{countryCases}</span></p>
              <p>CASES TODAY: <span className="recovered">{countryCasesToday}</span></p>
              <p>DEATHS: <span className="deaths">{countryCasesDeath}</span></p>
              <p>RECOVERED: <span className="recovered">{countryCasesRecovered}</span></p>
            </div>
          </div>
        </div>
      }
      </div>
    )
  }
}
