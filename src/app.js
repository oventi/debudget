import deborah_profile from "./deborah_profile.json";
import { getDate } from "date-fns";
import { dqs, ael, get_input_float } from "./util";
//import { list_group_todo } from "./vanilla_components.js";
import { todo_list } from "./todo_list.js";

// load user profile
const profile = deborah_profile;

// How much did you get paid?
const label = document.querySelectorAll('label[for="salary_pay"]')[0];
label.innerText = `Hi ${profile.name}, how much did you get paid?`;

function plan_budget() {
  const salary_pay = get_input_float("#salary_pay");
  const month_early = getDate(Date.now()) < 15;

  if (isNaN(salary_pay) || salary_pay <= 0) {
    return;
  }

  let needs = 0;
  needs += 375; // rent
  needs += 100; // debt
  needs += 102; // credit card debt
  needs += month_early ? 616 : 356; // EXPENSES

  const list = [
    //"Move any money you had left before you got paid to SAVINGS.",
    `Pay $375 to Andrés. Reference: "rent 2 weeks".`,
    //`Transfer $616 to EXPENSES.`, //`Pay $102 of credit card debt.`, //`Pay $100 to Andrés. Reference: "debt".`,
    `You have $${salary_pay - needs} left to spend with your debit card.`
  ];

  // "You have $${salary_pay - needs} left to spend with your debit card."

  /*
  if ) {
    // You should have $(salary_pay - 375 - 100 - 102 - 616) left to spend as you wish
    let left_to_spend = spend - expenses;

    // Display the budget plan on the app
    document.getElementById("spend").textContent = "$" + spend;
    document.getElementById("savings").textContent = "$" + savings;
    document.getElementById("expenses").textContent = "$" + expenses;
    document.getElementById("left_to_spend").textContent = "$" + left_to_spend;
  }
  */

  const instructions = dqs("#instructions")[0];
  //instructions.innerHTML = list_group_numbered(list);
  instructions.innerHTML = todo_list("after_pay", list).render();
}

ael("#plan", "click", plan_budget);

/*
dqs("#test")[0].innerHTML = `
<div>
  ${list_group(["a", "b"])}
  <hr />
  ${list_group_numbered(["a", "b"])}  
</div>
`;
*/
