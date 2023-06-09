// prompt for blood group input
let bloodGroup = prompt(
  "Enter the blood group. (A+, A-, B+, B-, O+, O- ,AB+ ,AB-)"
);
if (bloodGroup !== null) {
  bloodGroup = bloodGroup.toUpperCase();
}

/**********************************
 * Filter available donors by blood group and last donation criteria
 ***********************************/

const availableDonors = bloodDonors.filter((donor) => {
  const { blood_group, last_donate } = donor;
  return blood_group === bloodGroup && last_donate > 120;
});

// Display available donors
console.log("Available Donors:");

if (availableDonors.length > 0) {
  //output
  console.table(availableDonors, [
    "name",
    "age",
    "gender",
    "blood_group",
    "location",
    "cell",
  ]);
} else {
  console.log(`\nNo available donors found for: "${bloodGroup}"`);
}

/**********************************
 * Filter donors with upcoming avaibility days
 ***********************************/

const upcomingDonors = bloodDonors.filter((donor) => {
  const { blood_group, last_donate } = donor;
  return blood_group === bloodGroup && last_donate <= 120;
});

// Display upcoming Donors and remaining days for donation
console.log("\nUpcoming Donors:");

//upcoming donors array with remaining days for donation
const upcomingDonorsArray = [];

if (upcomingDonors.length > 0) {
  upcomingDonors
    .sort((a, b) => b.last_donate - a.last_donate) //sort donor (from smaller to bigger of remainning days)
    .map((donor) => {
      // calculate remaining days for donation
      const remainingDays = 120 - donor.last_donate;

      // update donor with remaining days
      donor = { ...donor, remainingDays };

      //push into upcomingDonorsArray
      upcomingDonorsArray.push(donor);
    }); // ends map

  //output
  console.table(upcomingDonorsArray, [
    "name",
    "age",
    "gender",
    "blood_group",
    "location",
    "cell",
    "remainingDays",
  ]);
} else {
  console.log(`\nNo available upcoming donors found for: "${bloodGroup}"`);
}

/**********************************
 * functionality for searching donor by phone number
 ***********************************/

// prompt for mobile number input
const phoneNumber = prompt("Enter the donor's mobile number. e.x: 01777883355");

//find donor by providing mobile number
let donorByPhoneNum = bloodDonors.find((donor) => {
  return donor.cell === phoneNumber;
});

// Display donor maching with phone number with donation history
console.log("\nDonors searched by phone number:");

// array of donor searched by phone number
const donorBySearch = [];

if (donorByPhoneNum) {
  donorBySearch.push(donorByPhoneNum);
  const { name, last_donate, donation } = donorBySearch[0];

  //output
  console.table(donorBySearch, [
    "name",
    "age",
    "gender",
    "blood_group",
    "location",
    "cell",
  ]);

  // check is Available for donation ?
  if (last_donate > 120) {
    console.log(`"${name}" is available for donation now.`);
  } else {
    console.log(
      `"${name}" is not available for donation. Next donation available in "${
        120 - last_donate
      }" days.`
    );
  }

  // display donation history
  console.log(`\nDonation history:`);

  if (donation.length > 0) {
    //output
    console.table(donation);
  } else {
    console.log("No donation history found");
  }
} else {
  console.log("\nNo donor found with the provided phone number.");
}

