######################################################
# Arturo
# Programming Language + Bytecode VM compiler
# (c) 2019-2022 Yanis Zafirópulos
#
# @file: arturo-lang.io/installer/nightly.sh
######################################################

################################################
# CONSTANTS
################################################

REPO="nightly"

################################################
# HELPERS
################################################

RED='\e[0;31m'
GREEN='\e[1;32m'
BLUE='\e[0;34m'
MAGENTA='\e[1;35m'
CYAN='\e[1;36m'
GRAY='\e[0;90m'
CLEAR='\e[0m'

printColorized() {
    NC='\e[0m'
    printf "${1}${2}${NC}"
}

panic() {
    printf "$@\n" >&2
    exit 1
}

print() {
    printf "${1}"
}

eecho() {
    printf "$1\n"
}

showHeader() {
    eecho "======================================"
    eecho "${GREEN}"
    eecho "               _                    "
    eecho "              | |                   "
    eecho "     __ _ _ __| |_ _   _ _ __ ___   "
    eecho "    / _\` | '__| __| | | | '__/ _ \ "
    eecho "   | (_| | |  | |_| |_| | | | (_) | "
    eecho "    \__,_|_|   \__|\__,_|_|  \___/  "
    eecho "                                    "
    eecho "${CLEAR}"
    printf "     \e[1mArturo"
    printf " Programming Language\e[0m\n"
    eecho "      (c)2021 Yanis Zafirópulos"
    eecho ""

    eecho "======================================"
    eecho " ► $1"
    eecho "======================================"
    printf "${CLEAR}"
}

showFooter(){
    eecho ""
    printf "${GRAY}"
    eecho " :---------------------------------------------------------"
    eecho " : Arturo has been successfully installed!"
    eecho " :"
    eecho " : To be able to run it,"
    eecho " : first make sure its in your \$PATH:"
    eecho " :"
    eecho " :    export PATH=$HOME/.arturo/bin:\$PATH"
    eecho " :"
    eecho " : and add it to your ${shellRcFile},"
    eecho " : so that it's set automatically every time."
    eecho " :"
    eecho " : Rock on! :)"
    eecho " :---------------------------------------------------------"
    printf "${CLEAR}"
    eecho ""
}

section(){
    eecho ""
    printf " ${MAGENTA}●${CLEAR} ${1}"
}

info(){
    eecho "   ${GRAY}${1}${CLEAR}"
}

create_directory() {
    mkdir -p "$1"
}

create_tmp_directory() {
    ARTURO_TMP_DIR="$(mktemp -d 2>/dev/null || mktemp -d -t art)"
}

cleanup_tmp_directory() {
    if [ -n "$ARTURO_TEMP_DIR" ] ; then
        rm -rf "$ARTURO_TEMP_DIR"
        ARTURO_TEMP_DIR=""
    fi
}

command_exists(){
    type "$1" &> /dev/null
}

animate_progress(){
    pid=$! # Process Id of the previous running command

    spin='-\|/'

    i=0
    printf "${CYAN}"
    while kill -0 $pid 2>/dev/null
    do
        i=$(( (i+1) %4 ))
        printf "\r ${spin:$i:1}"
        sleep .1
    done
    printf "\b\b\b\b     \x1B[A\x1B[A"
    printf "${CLEAR}"
}

##-----------------------------------------------

verifyOS(){
    case "$OSTYPE" in
        linux*)     currentOS="Linux" ;;
        linux-gnu*) currentOS="Linux" ;;
        darwin*)    currentOS="macOS" ;;
        cygwin*)    currentOS="Windows" ;;
        msys*)      currentOS="WindowsMsys2" ;;
        solaris*)   currentOS="Solaris" ;;
        freebsd*)   currentOS="FreeBSD" ;;
        bsd*)       currentOS="BSD" ;;
        *)
            if [ `uname` = "Linux" ]; then
                currentOS="Linux"
            elif [ `uname` = "FreeBSD" ]; then
                currentOS="FreeBSD"
            else
                currentOS="Unknown ($OSTYPE / `uname`)"
            fi ;;
    esac

    info "os: $currentOS"
}

verifyShell(){
    case "$SHELL" in
        "/bin/zsh")
            currentShell="zsh" ;
            shellRcFile="~/.zshrc" ;;
        "/bin/bash")
            currentShell="bash" ;
            shellRcFile="~/.bashrc or ~/.profile" ;;
        "/bin/sh")
            currentSheel="sh" ;
            shellRcFile="~/.profile" ;;
        *)
            currentShell="unrecognized" ;
            shellRcFile="~/.profile" ;;
    esac

    info "shell: $currentShell"
}

install_prerequisites() {
    case "$(uname)" in
        "Linux")
            eecho ""
            printf "   ${GRAY}"
            sudo apt -qq update
            sudo apt -qq install -yq libgtk-3-dev libwebkit2gtk-4.0-dev
            printf "${CLEAR}"
            ;;
        *)
            ;;
    esac
}

get_download_url() {
    downloadUrl=$(curl -s https://api.github.com/repos/arturo-lang/$REPO/releases | grep "browser_download_url.*${1}" | cut -d : -f 2,3 | tr -d \" | head -1)
}

download_arturo() {
    create_tmp_directory
    get_download_url $currentOS
    curl -sSL $downloadUrl --output "$ARTURO_TMP_DIR/arturo.tar.gz"
    tar -zxf "$ARTURO_TMP_DIR/arturo.tar.gz" -C $ARTURO_TMP_DIR
}

install_arturo() {
    create_directory ~/.arturo/bin
    create_directory ~/.arturo/lib

    cp $ARTURO_TMP_DIR/arturo ~/.arturo/bin
}

msys_create_arturo_path() {

    ARTURO_DIR="$HOME/.arturo"

    create_directory "$ARTURO_DIR/bin"
    create_directory "$ARTURO_DIR/lib"
    # info "~/.arturo/bin and ~/.arturo/lib created!"
}

msys_download_arturo() {

    BIN_PATH="$ARTURO_DIR/bin"
    get_download_url $currentOS

    # info "Arturo downloaded into ~/.arturo/bin Folder!"
    curl -sSL $downloadUrl --output "$BIN_PATH/arturo.tar.gz"

    # info "Unpacking Arturo..."
    tar -zxf "$BIN_PATH/arturo.tar.gz" -C $BIN_PATH
    # info "Unpacked!"

}

# To generate this file on Msys2, use:
# curl -sSL \
#  https://github.com/arturo-lang/arturo/releases/download/v0.9.80/arturo-0.9.80-Windows-full.zip \
#  --output /home/development/arturo_setup/arturo.zip
# explorer .
# Unzip with WinRar with extract here, and run:
# tar czf arturo.tar.gz arturo-full-windows-latest/*
msys_fake_download_arturo() {
    # simulates the tar.gz for WindowsMsys2
    # The file is the same .zip for Windows
    # But the format is .tar.gz for unpack with tar command
    BIN_PATH="$ARTURO_DIR/bin"
    cp /home/development/arturo_setup/arturo.tar.gz $BIN_PATH
    # info "Arturo downloaded into ~/.arturo/bin Folder!"

    # info "Unpacking Arturo..."
    tar -zxf "$BIN_PATH/arturo.tar.gz" -C $BIN_PATH
    mv $BIN_PATH/arturo-full-windows-latest/* $BIN_PATH/
    # info "Unpacked!"

}

msys_cleanup() {
    rm -f "$BIN_PATH/arturo.tar.gz"
    rm --dir -f "$BIN_PATH/arturo-full-windows-latest"
    # info "~/.arturo/bin/arturo.tar.gz and ~/.arturo/bin/arturo-full-windows-latest/ removed!"
}

################################################
# MAIN
################################################

main() {
    showHeader "Installer"

    section "Checking environment..."
    eecho ""
    verifyOS
    verifyShell

    if [ "$currentOS" = "Linux" ] || [ "$currentOS" = "macOS" ]; then
        section "Checking prerequisites..."
        install_prerequisites

        section "Downloading..."
        download_arturo

        section "Installing..."
        install_arturo

        section "Cleaning up..."
        cleanup_tmp_directory

        eecho ""

        section "Done!"
        eecho ""
        showFooter

    elif [[ "$currentOS" = "WindowsMsys2" ]]; then
        section "Creating environment..."
        info "\nOS: $currentOS"
        msys_create_arturo_path

        section "Downloading..."
        msys_download_arturo

        section "Cleaning up..."
        msys_cleanup

        eecho ""

        section "Done!"
        eecho ""
        showFooter
    else
        panic "Cannot continue. Unfortunately your OS is not supported by this auto-installer."
    fi
}



#echo $downloadUrl

main