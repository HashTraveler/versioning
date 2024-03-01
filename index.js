import { Octokit } from 'octokit';
import packageJSON from './package.json' assert { type: 'json' };
import semver from 'semver';
import chalk from 'chalk';
import boxen from 'boxen';


const octokit = new Octokit()

const boxMessage = (message) => boxen(message, { padding: 1 });
const checkProductVersion = async () => {
  console.log('Checking version...')

  const owner = 'facebook';
  const repo = 'react';
  const latestRelease = await octokit.request(`GET /repos/${owner}/${repo}/releases/latest`)

  const localVersion = packageJSON.version;
  const latestVersion = latestRelease.data.tag_name;

  if (semver.lt(localVersion, latestVersion)) {
    const url = latestRelease.data.html_url;
    const message = `${chalk.red('Update available!')}: ${latestVersion}\n\n${`Checkout the latest release at:\n${url}`}`;

    console.log(boxMessage(message));
  } else {
    console.log(boxMessage(chalk.green('You are using the latest version!')));
  }

  // Do a small change
}

void checkProductVersion();
