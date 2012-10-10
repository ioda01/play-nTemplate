package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import controllers.NTemplateController;

import models.*;

public class Application extends NTemplateController {

    public static void index() {
    	System.out.println(Play.configuration.get("some.url"));
    	String arg1 = (String) request.params.get("arg1");
    	String arg2 = (String) request.params.get("arg2");
        render(arg1, arg2);
    }

    public static void testMultiRender() {
    	model.put("arg1", (String) request.params.get("arg1"));
    	model.put("arg2", (String) request.params.get("arg2"));
    	String templates = (String) request.params.get("templates");
    	if (templates != null && !templates.isEmpty()) {
    		renderNTemplates(model, templates.split(","));
    	}
    	index();
    }

}