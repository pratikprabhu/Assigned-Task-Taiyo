import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const [covidData, setCovidData] = useState<any>(null); // Use a more specific type if available

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://disease.sh/v3/covid-19/all');
        setCovidData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const renderStatisticRow = (label: string, value: any) => (
    <tr key={label}>
      <td className="px-4 py-2 font-semibold border border-black">{label}</td>
      <td className="px-4 py-2 border border-black">{value}</td>
    </tr>
  );

  return (
    <div className="dashboard">
      <h2 className="text-2xl font-semibold mb-4 bg-blue-500 text-white py-2 px-4 rounded-md text-center">
  COVID-19 Dashboard
</h2>

      {covidData ? (
        <div className="statistics bg-white rounded-lg max-h-[calc(100vh-150px)] overflow-auto shadow-md p-4 table-container">
          <style>
          {`
            .overflow-auto::-webkit-scrollbar {
            display: none;
            }
          `}
        </style>
          <table className="w-full border-collapse border border-gray-300">
            <thead className=" bg-white z-10">
              <tr className="bg-blue-200">
                <th className="px-4 py-2 font-semibold border border-black">Statistic</th>
                <th className="px-4 py-2 font-semibold border border-black">Value</th>
              </tr>
            </thead>
            <tbody>
              {renderStatisticRow('Total Cases', covidData.cases)}
              {renderStatisticRow('Total Deaths', covidData.deaths)}
              {renderStatisticRow('Total Recovered', covidData.recovered)}
              {renderStatisticRow('Updated', covidData.updated)}
              {renderStatisticRow("Today's Cases", covidData.todayCases)}
              {renderStatisticRow("Today's Deaths", covidData.todayDeaths)}
              {renderStatisticRow("Today's Recovered", covidData.todayRecovered)}
              {renderStatisticRow('Active Cases', covidData.active)}
              {renderStatisticRow('Critical Cases', covidData.critical)}
              {renderStatisticRow('Cases per One Million', covidData.casesPerOneMillion)}
              {renderStatisticRow('Deaths per One Million', covidData.deathsPerOneMillion)}
              {renderStatisticRow('Total Tests', covidData.tests)}
              {renderStatisticRow('Tests per One Million', covidData.testsPerOneMillion)}
              {renderStatisticRow('Population', covidData.population)}
              {renderStatisticRow('One Case per People', covidData.oneCasePerPeople)}
              {renderStatisticRow('One Death per People', covidData.oneDeathPerPeople)}
              {renderStatisticRow('One Test per People', covidData.oneTestPerPeople)}
              {renderStatisticRow('Active per One Million', covidData.activePerOneMillion)}
              {renderStatisticRow('Recovered per One Million', covidData.recoveredPerOneMillion)}
              {renderStatisticRow('Critical per One Million', covidData.criticalPerOneMillion)}
              {renderStatisticRow('Affected Countries', covidData.affectedCountries)}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};


export default Dashboard;

