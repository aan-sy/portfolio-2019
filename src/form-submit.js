const getFormData = (form) => {
  const elements = form.elements;
  let honeypot;

  // input name 값 받아오기
  const names = Object.keys(elements)
    .filter(key => {
      if(elements[key].name === 'honeypot') {
        honeypot = elements[key].value;
        return false;
      }
      return true;
    })
    .map(key => {
      if(elements[key].name !== undefined) {
        return elements[key].name;
      }
    })
    .filter((name, i, arr) => {
      return arr.indexOf(name) === i && name;
    })

  // input value 받아오기
  const formData = {};
  names.forEach(name => {
    const element = elements[name];
    formData[name] = element.value;

    // element가 여러 아이템을 가지는 경우, value 받아오기
    if(element.length) {
      const data = [];
      for(let i = 0; i < element.length; i++) {
        const item = element.item(i);
        if(item.checked || item.selected) {
          data.push(item.value);
        }
      }
      formData[name] = data.join(', ');
    }
  })

  formData.formDataNameOrder = JSON.stringify(names);
  formData.formGoogleSheetName = form.dataset.sheet || 'responses'; // default sheet name
  formData.formGoogleSendEmail = form.dataset.email || ''; // no email by default

  return {data: formData, honeypot: honeypot};
}

const disableAllButtons = (form) => {
  const buttons = form.querySelectorAll('button');
  buttons.forEach(button => {
    button.disabled = true;
    button.classList.add('disabled');
  })
}

const enableAllButtons = (form) => {
  const buttons = form.querySelectorAll('button');
  buttons.forEach(button => {
    button.disabled = false;
    button.classList.remove('disabled');
  })
}

const handleFormSubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = getFormData(form);
  const data = formData.data;

  // If a honeypot field is filled, assume it was done so by a spam bot.
  if(formData.honeypot) return false;

  // send mail
  disableAllButtons(form);
  const thankYouMessage = form.querySelector('.thankyou_message');
  if(thankYouMessage) {
    thankYouMessage.style.display = thankYouMessage && 'block';
    thankYouMessage.innerText = '전송 중...';
  }
  
  const url = form.action;
  const encoded = Object.keys(data)
  .map(key => `${encodeURIComponent(key)} = ${encodeURIComponent(data[key])}`)
  .join('&');

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: encoded,
  })
  .then(res => {
    if(!res.ok) console.error(res.statusText);
    return res.json();
  })
  .then(data => {
    if(data.result === 'success') {
      form.reset();
      // enableAllButtons(form);
      if(thankYouMessage) {
        thankYouMessage.innerText = '메일 전송 완료. 확인 후 회신드리겠습니다. 감사합니다.'
        setTimeout(() => {
          thankYouMessage.style.display = 'none';
        }, 5000)
      }
    }
  })
}

const forms = document.querySelectorAll('.gform');

forms.forEach(form => {
  form.addEventListener('submit', handleFormSubmit)
})