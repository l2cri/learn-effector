import { combine, createEffect, createEvent, createStore, sample } from "effector"

const nextPost = createEvent()

const getCommentFx = createEffect(async postId => {
    const url = `posts/${postId}/comments`
    const base = 'https://jsonplaceholder.typicode.com'
    const req = await fetch(`${base}/${url}`)

    return req.json()
})

const $postComments = createStore([])
    .on(getCommentFx.doneData, (_, posts) => posts)
const $currentPost = createStore(1)
    .on(getCommentFx.done, (_, {params: postId}) => postId)

const $status = combine(
    $currentPost, $postComments, getCommentFx.pending,
    (postId, comments, isLoading) => isLoading
        ? 'Загрузка поста...'
        : `Пост ${postId} имеет ${comments.length} комментириев`
)

sample({
    source: $currentPost,
    clock: nextPost,
    fn: postId => postId + 1,
    target: getCommentFx,
})

export { $postComments, $status, $currentPost, nextPost }