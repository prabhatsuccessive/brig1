const { events, Job } = require("brigadier");
events.on("exec", () => {
  var hello = new Job("hello", "alpine:3.4") 
hello.tasks = [ 
"echo Hello",
"echo World", 
]
  job.run();
});
