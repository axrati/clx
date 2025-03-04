<p align="center">
  <img height=160px src="icon.png" alt="clx"/>
</p>

<h1 align="center">
CLX
</h1>

An app that prioritizes **ergonomics** for managing your notes, urls, passwords, code snippets and more.

## Fully keyboard accessible.

- `ctl`+`\` to hide and focus, type to search immediately.
- `ctl`+`n` for new item.
- `ctl`+`s` to refocus searchbar.
- `ctl`+`d` to refocus tab key options.
- Use `tab` or `shift`+`tab` to move focus area.
- Use `enter` to click.
- Use `arrow keys` to change your Tab Key Option when focused.

## Tab Key Option

Table Key Option dictates which attribute in a row you focus on.

- `Copy` (default) - scroll through copy buttons
- `Expand` - scroll through expansion/compression buttons
- `Exec` - scroll through buttons that execute the content value in a new terminal window
- `Edit` - scroll through edit buttons
- `Delete` - scroll through delete buttons

## Intuitive Search

- Quickly find the information you're looking for with a comprehensive search across all text in your notes.
- Use naming strategies to filter in or across sections

## Easy Installations

For re-installations **or** updates, just repeat this process. Your config file is a .json file stored in your operating systems application data folder.

We promise to be upgrade easy.

### Windows

1. Download file - [Click here to download a zip file.](https://s3.amazonaws.com/axpub/clx/windows.zip)

2. Unzip to a location of your choice

3. Add shortcut to clx.exe by right clicking

4. Use - run shortcut and pin to task bar

### Mac

1. Download file - [Click here to download a zip file.](https://s3.amazonaws.com/axpub/clx/mac.zip)

2. Unzip - `unzip mac.zip -d clx-output`

3. Copy `clx-output/mac/clx.app` to Application

4. Open - **IMPORTANT** - you must right click and choose open for the first time because it "cant verify the developer"

5. Use - pin to task bar and run

### Linux

1. Download file - [Click here to download a zip file.](https://s3.amazonaws.com/axpub/clx/linux.zip)

2. Unzip - `unzip linux.zip -d clx-output`

3. Install - `sudo dpkg -i clx-output/clx_1.0.0_amd64.deb`

4. Use - `clx`

<br></br>

# Ergonomic Strategies

CLX stores items in a structure like this:

| Value         | Defintion                                                  | Required | Examples                                |
| ------------- | ---------------------------------------------------------- | -------- | --------------------------------------- |
| `id`          | Unique identifier for each item.                           | N/A      | `6b79a73c-e0d4-402d-98e0-911eea44f8e9'` |
| `title`       | Title the purpose your notes/commands                      | `TRUE`   | `12-11 Meeting Notes`                   |
| `description` | Provides additional context or details. Useful for tagging | `FALSE`  | `Meeting regarding stakeholders`        |
| `value`       | Contains the value to access/copy/execute.                 | `TRUE`   | `...`                                   |

When searching through large notes, its helpful to set your Tab Key Option to `Expand` so you can open/collapse the view.

Because of the autohide/autofocus on search, this could even be more ergonomic to save import URLs with.

```text
---Title---
work internal portal

---Content---
https://www.whatever.com/you/need/to/quickly/paste
```

## Organizational Strategies

When managing notes, it helps to switch the Tab Key Option to `Edit`. To better organize notes, you may want to leverage the colon based indexing (`a:b`) for more complex matches on your searches. It uses title as a way to filter more specifically using compounding criteria.

```text
---Title---
Meeting minutes

---Description---
work:meetings:abc-working-group

---Content---
This can be multi-lined content than can go on as long as you need, all of it is searchable.
```

This is also a great way to store any code/functions you may need. Use the colon based indexing to even search across languages or functionality

```text
---Title---
pytorch import

---Description---
python:imports

---Content---
import torch
import torch.nn as nn
import torch.nn.functional as F
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
```

Seach terms that would match the below usecase:
`:math, `excel`, `a`, etc

```text
---Title---
weighted average

---Description:---
excel:math

---Content---
=LET(
  data, A2:A100,
  criteria, B2:B100,
  weights, C2:C100,
  validData, FILTER(data, (criteria="Include")*(data>0)),
  validWeights, FILTER(weights, (criteria="Include")*(data>0)),
  weightedAvg, SUM(validData * validWeights) / SUM(validWeights),
  weightedAvg
)
```

## Command Center for applciations

Add your own scripts or applets as shortcuts by storing the command as the `Content`.

```text
---Title---
work:code:sand-project

---Content---
python3.12 ~/dir/to/proj/main.py
```

This is also compatible with all the abilities your OS has. For example, this would open Docker Desktop on mac:

```text
---Title---
docker-desktop

---Content---
open -a Docker
```

<br></br>

# Developers

#### Run it locally

```
npm install
npm start
```

### Contribute

Reach out or open a pull request at any time.

<br></br>

# Build instructions / Self Installation

### Linux Install / Start / Uninstall

```bash
# Install
sudo apt update
npm run build-linux
sudo dpkg -i release/clx_1.0.0_amd64.deb

# Start
clx

# Uninstall
sudo dpkg -r clx
```

### Mac Install / Start / Uninstall

```bash
# Install
sudo apt update
npm run build-mac
# Open
release/mac/clx.app
# Drag to Applications

# Start
Open app from Applications

# Uninstall
Remove app from Applications
```

### Windows Install / Start / Uninstall

```bash
# Build
npm run build-win

# Start
cd release/win-unpacked
./clx.exe

# Uninstall
# Remove directory and shortcut you made to it
```
