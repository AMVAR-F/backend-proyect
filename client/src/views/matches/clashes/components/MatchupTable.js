import React from 'react';

const MatchupTable = React.memo(({ matchups }) => {

  const allMatchups = Object.values(matchups).flat();

  return (
    <div>
      <h3>Matchups</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Home Team</th>
            <th></th>
            <th>Away Team</th>
            <th>Date</th>
            <th>Time</th>
            <th>Place</th>
          </tr>
        </thead>
        <tbody>
          {allMatchups.map((matchup, idx) => (
            <tr key={idx}>
              <td>{matchup.homeTeam}</td>
              <td>VS</td>
              <td>{matchup.awayTeam}</td>
              <td>{matchup.date}</td>
              <td>{matchup.time}</td>
              <td>{matchup.place}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default MatchupTable;
