import { importScene } from "./scene.js";
import { is } from "../is.js";

let texturesExtensions = ["png", "jpg", "jpeg", "gif", "dds", "env", "tga"];
let videosExtensions = ["mp4", "ogv", "webm"];
let scenesExtensions = ["babylon", "gltf", "glb", "obj", "stl"];

function getExtension(url : string) : string {
  return url.split('.').pop();
}

function isScene(url : string) : boolean {
  let extension;
  return !isCube(url) && (extension = getExtension(url) && scenesExtensions.indexOf(extension) != -1);
}

function isTexture(url : string) : boolean {
  let extension;
  return !isCube(url) && (extension = getExtension(url) && texturesExtensions.indexOf(extension) != -1);
}

function isVideo(url : string) : boolean {
  let extension;
  return !isCube(url) && (extension = getExtension(url) && videosExtensions.indexOf(extension) != -1);
}

function isCube(url : string) : boolean {
  return url.slice(-1) === '/';
}

function _loadMedia(url : string, settings : any) {
  if (isScene(url)) {
    // return loadS
  }
  else {
    if (isTexture(url)) {

    }
    else {
      if (isCube(url)) {

      }
    }
  }
}

// import is a reserved word
/**
export function _import(content : any, settings? : any) : Q.Promise<any> {
  if (is.String(content)) {
    if (isScene(content)) {

    }
    else {
      if (isTexture(content)) {

      }
      else {
        if (isCube(content)) {

        }
      }
    }
  }
  else {
    if (content["scene"]) {

    }
    else {
      if (content["url"]) {
        if (isScene(content)) {

        }
        else {
          if (isTexture(content)) {

          }
          else {
            if (isCube(content)) {

            }
          }
        }
      }
    }
  }
}
 **/

export namespace _import {
  export let scene = importScene;
}