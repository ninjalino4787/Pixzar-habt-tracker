"use client";

export default function Page() {
  function FormSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    // e.preventDefault() stops the page from refreshing after the form is submitted
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formData_habit = formData.get("habit");
    const formData_why = formData.get("why");
    const formData_timeCommit = formData.get("timeCommit");
    const formData_repeat = formData.get("repeatedly");
    const formData_commitcheck = formData.get("commit");


    // object creation for habits
    const habitObject = JSON.parse(localStorage.getItem("habit") || "[]");
    habitObject.push({
      id: crypto.randomUUID(),
      habit: formData_habit,
      why: formData_why,
      commitment: formData_timeCommit,
      repeat: formData_repeat,
      commited: formData_commitcheck,
      checkIn : false, //just added
    });

    localStorage.setItem("habit", JSON.stringify(habitObject));
    console.log(habitObject);

    e.currentTarget.reset();

    // window.location.href = "/" //what this does is after successfully entering a new habit it redirects the user to the dashboard
    // but in terms of react we use the nextjs router to navigate between pages
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-br from-cyan-400 via-cyan-600 to-cyan-800">
      {/* new container */}
      <div className="border p-6 md:p-10 items-center justify-center bg-gray-600 text-white w-full max-w-lg mx-auto">
        <div className="text-center p-5">
          <h1 className="text-2xl md:text-4xl font-bold">Welcome to Pixzar!</h1>
          <p className="text-lg">Write and we would track it</p>
        </div>
        <form onSubmit={FormSubmitHandler} className="flex flex-col gap-4">
          {/* first input div */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="habit">Your new Habit</label>
            <input
              type="text"
              name="habit"
              id="habit"
              placeholder="Habit"
              required
              className="w-full border"
            />
          </div>
          {/* 2nd input div  */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="why">Why are you doing this?</label>
            <input
              type="text"
              id="why"
              name="why"
              placeholder="Your Why?"
              required
              className="w-full border"
            />
          </div>

          {/* 3rd input div */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="timeCommit">
              How much time would you like to commit to this habit
            </label>
            <select
              name="timeCommit"
              id="timeCommit"
              required
              className="w-full border text-white bg-gray-600"
            >
              <option value="">Select Daily commitment</option>
              <option value="30">30mins</option>
              <option value="60">1hr</option>
              <option value="90">1hr 30mins</option>
              <option value="120">2hrs</option>
              <option value="150">2hrs 30mins</option>
              <option value="180">3hrs</option>
            </select>
          </div>

          {/* 4th input div */}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="repeatedly">
              Do you want to repeat this habit?
            </label>
            <select
              name="repeatedly"
              id="repeatedly"
              className="w-full border  text-white bg-gray-600"
            >
              <option value="">Select a duration</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* 5th input div */}
          <div className="items-center flex border gap-1.5 my-4">
            <input type="checkbox" name="commit" id="commit" required />
            <label htmlFor="commit">I commit to building this Habit</label>
          </div>

          <button type="submit" className="border rounded-md py-2 mt-2 hover:bg-gray-500">
            Add Habit
          </button>
        </form>
      </div>
    </div>
  );
}
