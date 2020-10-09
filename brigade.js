const { events, Job } = require("brigadier");

 events.on("exec", function(e, project) {
  console.log("received push for commit " + e.revision.commit)

  // Create a new job
 
   var docker = new Job("docker" , "docker:dind");
   
    docker.privileged = true;
    docker.env = {
    DOCKER_DRIVER: "overlay"
    };
  docker.env.DOCKER_USER = project.secrets.dockerLogin
  docker.env.DOCKER_PASS = project.secrets.dockerPass

  docker.tasks = [
    "dockerd-entrypoint.sh &",
    "sleep 20",
    "cd src",
    "pwd",
    "cat README.md",
    "ls -lart",
    "docker build -t prabhat2346/brigade:12 .",
    "docker login docker.io -u $DOCKER_USER -p $DOCKER_PASS",
    "docker push prabhat2346/brigade:12",
    "docker images"
]

  docker.streamLogs = true;

  var hello = new Job("hello", "alpine:3.4")
  hello.tasks = [
    "echo Hello",
    "echo World",
  ]

 var goodbye = new Job("goodbye", "alpine:3.4")
  goodbye.tasks = [
    "echo Goodbye",
    "echo World",
 ]

 // We're done configuring, so we run the job
 // hello.run()
 // goodbye.run()
//  docker.run()
//events.on("exec", (e, project) => {
 //let pipeline = new pipeline()
console.log(e)
console.log(e.revision.ref)
if (e.revision.ref == "master")

{

docker.run()

}

else if (e.revision.ref == "develop")

{
 
 goodbye.run()
}

else (e.revision.ref == "fb1")

{

hello.run()

}

})
