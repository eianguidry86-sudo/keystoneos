$downloads = @(
  @{ url="https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODhmMzVjYTlhYTQwOTY4ODBhZmQxMDUyM2M2EgsSBxCh2b_exhEYAZIBIwoKcHJvamVjdF9pZBIVQhM3MjU3MDEyMzcxNzI1NjYwNzMy&filename=&opi=89354086"; file="dashboard.html" },
  @{ url="https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODhmNGI3YzU3ZjcwNDRmNzM1ZjNjMGI3YjcxEgsSBxCh2b_exhEYAZIBIwoKcHJvamVjdF9pZBIVQhM3MjU3MDEyMzcxNzI1NjYwNzMy&filename=&opi=89354086"; file="fundamentals.html" },
  @{ url="https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODhmNGIzZTgzZWIwOTY4ODBhZmQxMDUyM2M2EgsSBxCh2b_exhEYAZIBIwoKcHJvamVjdF9pZBIVQhM3MjU3MDEyMzcxNzI1NjYwNzMy&filename=&opi=89354086"; file="settings.html" },
  @{ url="https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODhmNzhmMmQ0OGIwMjNiZTA0NjE3MjJiMGZmEgsSBxCh2b_exhEYAZIBIwoKcHJvamVjdF9pZBIVQhM3MjU3MDEyMzcxNzI1NjYwNzMy&filename=&opi=89354086"; file="tasks.html" },
  @{ url="https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODhmNGJhZjNjMWYwNWYxM2ZkNTcxMDM3NDVlEgsSBxCh2b_exhEYAZIBIwoKcHJvamVjdF9pZBIVQhM3MjU3MDEyMzcxNzI1NjYwNzMy&filename=&opi=89354086"; file="resources.html" },
  @{ url="https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODhmM2VmMjI0ODgwOTY4ODBhZmQxMDUyM2M2EgsSBxCh2b_exhEYAZIBIwoKcHJvamVjdF9pZBIVQhM3MjU3MDEyMzcxNzI1NjYwNzMy&filename=&opi=89354086"; file="timeline.html" },
  @{ url="https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODhmNzg2M2Y4ZjMwOTY4YTA5OGYxMDhmZmUzEgsSBxCh2b_exhEYAZIBIwoKcHJvamVjdF9pZBIVQhM3MjU3MDEyMzcxNzI1NjYwNzMy&filename=&opi=89354086"; file="login.html" },
  @{ url="https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ODhmNDVhMzVhMGMwOTY4OGZkYWU0MDM5NDkxEgsSBxCh2b_exhEYAZIBIwoKcHJvamVjdF9pZBIVQhM3MjU3MDEyMzcxNzI1NjYwNzMy&filename=&opi=89354086"; file="session-logs.html" }
)
foreach ($d in $downloads) {
  Write-Host "Downloading $($d.file)..."
  Invoke-WebRequest -Uri $d.url -OutFile $d.file
}
Write-Host "Done downloading all screens."
