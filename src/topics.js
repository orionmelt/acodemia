const topics = [
  {id: 'python', name: 'Python'},
  {id: 'js', name:'JavaScript'},
  {id: 'ds', name: 'Data Structures'},
  {id: 'algo', name: 'Algorithms'},
  {id: 'java', name: 'Java'},
].sort((a, b) => a.name.localeCompare(b.name));

export default topics;