<p align="center">
  <img src="icon.png" alt="clx"/>
</p>

<h1 align="center">
CLX
</h1>

An app for managing your library of notes, cli commands, etc. Helpful for managing things like ssh's to different services without having to remember host names/pem paths. Also good for taking notes and easily finding them.

## Fully keyboard accessible.

- `ctl`+`\` to hide and focus, type to search immediately.
- Use `tab` or `shift`+`tab` to move focus area.
- Use `enter` to click
- Use `space` to change your Tab Key Option.

## Tab Key Option

Table Key Option dictates which attribute in a row you focus on.

- `Copy` (default) - scroll through copy buttons
- `Expand` - scroll through expansion/compression buttons
- `Edit` - scroll through edit buttons
- `Delete` - scroll through delete buttons

<br></br>

## Running Locally

```
npm install
npm start
```

<br></br>

## Installations

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
sudo dpkg -i release/clx_1.0.0_amd64.deb

# Start
clx

# Uninstall
sudo dpkg -r clx
```

### Windows Install / Start / Uninstall

```bash
# Install
npm run build-win
sudo dpkg -i release/clx_1.0.0_amd64.deb

# Start
cd release/win-unpacked
./clx.exe

# Uninstall
# Remove directory and shortcut you made to it
```
