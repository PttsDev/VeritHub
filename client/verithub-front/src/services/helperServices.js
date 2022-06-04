import api from '@/services/api'


export default {
  
  calculateTuitionFee(data) {
    let totalCost = 0;
    let creditCost = data.creditCost;
    let subjects = data.subjects;
    let repetir = data.repetir;

    subjects.forEach(subject => {
      if(repetir==1) totalCost += ((subject.credits) * (creditCost))*1.3;
      else totalCost += (subject.credits) * (creditCost);
    })
    return totalCost;
  },

  // Se le pasa el ID
  fetchDataForFee(params) {

    return api().post('/course/findSubjects', params);

  }
}
