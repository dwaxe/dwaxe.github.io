---
layout: post
title: College Subreddit Sentiments
cover: post_index.png
date:   2014-5-27 05:09:00
categories: posts
---

I was wondering if there was a way to measure the relative happiness of students at a college, and my brain stumbled upon the idea of trawling their subreddits to find their average sentiments. Words like 'depression' would lower sentiment, while words like 'love' would raise it.

I started writing a reddit bot to do the dirty task of trawling through subreddits and finding their word counts, but then I discovered [reddit-analysis](https://github.com/rhiever/reddit-analysis), which does the dirty work for me. All I have left are the relatively simple tasks of installing it, modifying the code to trawl back through a longer span of time, and then writing a shell script to go through all the required subreddits.

Then I think need to figure out how to use Excel. Yikes.
