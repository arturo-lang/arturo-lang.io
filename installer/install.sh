#! /usr/bin/env sh

######################################################
# Arturo
# Programming Language + Bytecode VM compiler
# (c) 2019-2022 Yanis Zafirópulos
#
# @file: arturo-lang.io/installer/stable.sh
######################################################

set -o errexit
# set -o xtrace
################################################
# CONSTANTS
################################################

REPO="arturo"
VERSION="full"

for cmd in $@; do
    case $cmd in
        --nightly|-n) REPO="nightly";;
        --mini|-m)    VERSION="mini";; 
    esac
done

API_URL="https://api.github.com/repos/arturo-lang/${REPO}/releases"

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
    eecho "      (c)2024 Yanis Zafirópulos"
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
    mkdir --parents "$1"
}

create_tmp_directory() {
    ARTURO_TMP_DIR="$(
        mktemp --directory 2>/dev/null || 
        mktemp --directory -t art
    )"
}

cleanup_tmp_directory() {
    if [ -n "$ARTURO_TMP_DIR" ] ; then
        rm -rf "$ARTURO_TMP_DIR"
        ARTURO_TMP_DIR=""
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
        linux*)     currentOS="linux" ;;
        darwin*)    currentOS="macos" ;;
        cygwin*)    currentOS="windows-msys2" ;;
        msys*)      currentOS="windows-msys2" ;;
        solaris*)   currentOS="solaris" ;;
        freebsd*)   currentOS="freebsd" ;;
        bsd*)       currentOS="bsd" ;;
        *)
            if [ `uname` = "Linux" ]; then
                currentOS="linux"
            elif [ `uname` = "FreeBSD" ]; then
                currentOS="freebsd"
            else
                currentOS="Unknown ($OSTYPE / `uname`)"
            fi ;;
    esac

    info "os: $currentOS"
}

verifyShell(){
    case "$SHELL" in
        */bin/zsh)
            currentShell="zsh" ;
            shellRcFile="~/.zshrc" ;;
        */bin/bash)
            currentShell="bash" ;
            shellRcFile="~/.bashrc or ~/.profile" ;;
        */bin/sh)
            currentShell="sh" ;
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
    downloadUrl=$( 
        curl "$API_URL" --silent                \
          | grep "browser_download_url"         \
          | grep "$currentOS"                   \
          | grep $VERSION                       \
          | head --lines 1                      \
          | cut  --delimiter ":" --fields 2,3   \
          | tr   --delete \" 
    )
}

download_arturo() {
    create_tmp_directory
    get_download_url

    curl --location $downloadUrl                    \
         --output "$ARTURO_TMP_DIR/arturo.tar.gz"   \
         --silent                                   \
         --show-error

    # This piece of code is using traditional option style due
    # to compatibility issues between `tar`'s versions.
    # Long versions are accepted for `GNU's tar`, and for others ones
    # this behavior may vary.
    # 
    # So, here is the definition of each term:
    #   -z: --gzip
    #   -x: --extract 
    #   -f: --file 
    #   -C: --directory 
    tar -zxf "$ARTURO_TMP_DIR/arturo.tar.gz" -C $ARTURO_TMP_DIR
}

install_arturo() {
    create_directory $HOME/.arturo/bin
    create_directory $HOME/.arturo/lib

    # Since Arturo's folder is named as arturo-{version-information}
    # this is better to use wildcard 
    # to copy the whole content to the bin folder.
    cp $ARTURO_TMP_DIR/arturo-*/* $HOME/.arturo/bin
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

    if [ "$currentOS" = "linux" ] || [ "$currentOS" = "macos" ] || [ "$currentOS" = "windows-msys2" ]; then
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
    else
        panic "Cannot continue. Unfortunately your OS is not supported by this auto-installer.";
    fi
}


#echo $downloadUrl

main