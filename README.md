# spot-castify

When you answer questions, we recommend podcasts for you.

1. Select the category of podcasts you want to listen to.
2. Choose the genre you want to listen to from 1.

## install

```
% npm install -g spot-castify

# Run only for the first time
# Check 'How to set access token' in this document.
% spot-castify settoken

% spot-castify
```

## How to set access token

1. Access and login your Spotify Dashboard: https://developer.spotify.com/dashboard/
2. Choose 'Create app' and create your app.(Redirect URI：
   `http://localhost:8888/callback`)
   ![developer spotify com_dashboard_create](https://github.com/MikotoMakizuru/spot-castify/assets/56577866/24bd1cb7-8c97-412e-86d3-3a307ccbfadc)
3. Copy your 'Client ID' and 'Client Secret' for the next step.
   ![スクリーンショット 2024-05-05 15 14 04](https://github.com/MikotoMakizuru/spot-castify/assets/56577866/d7670d1b-b5b6-4ab4-97c8-95f82f366c3b)
4. Run `spot-castify settoken` and enter your credentials. You can retrive access token

## Usage

```
Usage: spot-castify [options] [command]

Options:
  -h, --help      display help for command

Commands:
  searchPodcast   <Default> Here are some podcast recommendations from spotify. Note:Require
                  'spot-castify settoken' command before the first time you run.
  settoken        Login Spotify via authorization code flow (Refer:
                  https://developer.spotify.com/documentation/general/guides/authorization-guide/).
  help [command]  display help for command
```

https://github.com/MikotoMakizuru/spot-castify/assets/56577866/c21747c0-1cd1-474c-acf3-96ba0a9d6100
