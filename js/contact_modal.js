let params = new URL(document.location).searchParams;

let senderName = params.get("name");
let email = params.get("email");
let textMessage = params.get("text_message");

let articleDetails = document.getElementById("main-article-details");

articleDetails.innerHTML = `
<div class="card details-card contact-text">
  <img
    src="https://t3.ftcdn.net/jpg/01/09/11/46/360_F_109114646_j5lwp47COjxAzAAoL2MZbtxGR8jx5FWe.jpg"
    class="card-img-top"
    alt="Received ruber stamp">
  <div class="card-body">
    <div class="card-main">
      <h5 class="card-title">We received your message.</h5>
      <p class="card-text card-text-bold">As soon as a administrator read your message we will contact you.</p>
      <p class="card-text">Your name: ${senderName}</p>
      <p class="card-text">Your e-mail: ${email}</p>
      <p class="card-text">Your message: ${textMessage}</p>
    </div>
    <div class="card-foot">
        <p class="price">Thank You...</p>
    </div>
  </div>
</div>`;
