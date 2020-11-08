import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CurrentDisplay {
  displayType: "issues" | "comments",
  issueId: number | null 
}

interface CurrentDisplayPayload {
  displayType: "issues" | "comments",
  issueId?: number 
}

interface CurrentRepo {
  org: string, 
  repo: string 
}

interface CurrentDisplayState = {
  page: number
} & CurrentDisplay & CurrentDisplay

const issuesDisplaySlice = createSlice({});

export default issuesDisplaySlice.reducer