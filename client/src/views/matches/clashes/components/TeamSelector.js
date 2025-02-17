import React from 'react';

const TeamSelector = React.memo(({ teams, selectedTeam, setSelectedTeam, label }) => {
  return (
    <div>
      <label>{label}:</label>
      <select className="form-select" value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
        {teams.map((team, index) => (
          <option key={index} value={team.name_team}>
            {team.name_team}
          </option>
        ))}
      </select>
    </div>
  );
});

export default TeamSelector;
