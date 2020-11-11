import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from 'react-markdown'
import classnames from 'classnames'
import { insertMentionLinks } from 'utils/stringUtils'
import { getComments, Comment } from 'api/githubAPI'
import { IssueLabels } from 'components/IssueLabels'
import { IssueMeta } from './IssueMeta'
import { IssueComments } from './IssueComments'
import { RootState } from "app/rootReducer";
import { fetchIssue } from "../issuesList/issuesSlice";
import styles from './IssueDetailsPage.module.css'
import './IssueDetailsPage.css'

interface IDProps {
  org: string
  repo: string
  issueId: number
  showIssuesList: () => void
}

export const IssueDetailsPage = ({
  org,
  repo,
  issueId,
  showIssuesList
}: IDProps) => {
  const dispatch = useDispatch()
  const [comments, setComments] = useState<Comment[]>([])
  const issue = useSelector((state: RootState) => state.issues.issuesByNumber[issueId])

  // const { commentsLoading, commentsError, comments } = useSelector(
  //   (state: RootState) => {
  //     return {
  //       commentsLoading: state.
  //     }
  //   })

    

  useEffect(() => {
    if (!issue) {
      dispatch(fetchIssue(org, repo, issueId))
    }

    window.scrollTo({ top: 0 })
  }, [org, repo, issueId, issue, dispatch])

  useEffect(() => {
    async function fetchComments() {
      if (issue !== null) {
        const comments = await getComments(issue.comments_url)
        setComments(comments)
      }
    }

    fetchComments()
  }, [issue])

  let content

  const backToIssueListButton = (
    <button className="pure-button" onClick={showIssuesList}>
      Back to Issues List
    </button>
  )

  if (commentsError) {
    return (
      <div className="issue-detail--error">
        {backToIssueListButton}
        <h1>There was a problem loading issue #{issueId}</h1>
        <p>{commentsError.toString()}</p>
      </div>
    )
  }

  if (issue === null) {
    content = (
      <div className="issue-detail--loading">
        {backToIssueListButton}
        <p>Loading issue #{issueId}...</p>
      </div>
    )
  } else {
    let renderedComments = <IssueComments issue={issue} comments={comments} />

    content = (
      <div className={classnames('issueDetailsPage', styles.issueDetailsPage)}>
        <h1 className="issue-detail__title">{issue.title}</h1>
        {backToIssueListButton}
        <IssueMeta issue={issue} />
        <IssueLabels labels={issue.labels} className={styles.issueLabels} />
        <hr className={styles.divider} />
        <div className={styles.summary}>
          <ReactMarkdown
            className={'testing'}
            source={insertMentionLinks(issue.body)}
          />
        </div>
        <hr className={styles.divider} />
        <ul>{renderedComments}</ul>
      </div>
    )
  }

  return <div>{content}</div>
}
