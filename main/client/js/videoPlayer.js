const video = document.querySelector("video")
const videoContainer = document.getElementById("videoContainer")

const handleEnded = () => {
    const { id } = videoContainer.dataset;
    console.log(id)
    fetch(`/api/videos/${id}/view`, {
        method:"POST",
    })
}

video.addEventListener("ended", handleEnded)