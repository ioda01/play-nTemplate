package controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import play.Play;
import play.data.validation.Validation;
import play.exceptions.PlayException;
import play.exceptions.TemplateNotFoundException;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Http.Request;
import play.mvc.Scope;
import play.mvc.results.RenderTemplate;
import play.templates.Template;
import play.templates.TemplateLoader;

public class NTemplateController extends Controller {

	protected static Map<String, Object> model = new HashMap<String, Object>();
	
	protected static Map<String, String> templates(String...fragments) {
		final Request theRequest = Request.current();
		final String controller = theRequest.controller;
		Map<String, String> fragmentsName = new HashMap<String, String>();
		for (String frag : fragments) {
			fragmentsName.put(frag, controller + "/fragments/" + frag + ".html");
		}
		return fragmentsName;
	}
	
	/**
	 * Renders a json containing the template id and the rendered escaped html.
	 * Ex: {"tmpl1" : "some escaped html"}
	 * 
	 * @param templatesIds List containing the template ids to be rendered 
	 * @param model The map containing the templates model.
	 */
	protected static void renderNTemplates(Map<String, Object> model, String...templatesIds) {
		Scope.RenderArgs templateBinding = Scope.RenderArgs.current();
        templateBinding.data.putAll(model);
        templateBinding.put("session", Scope.Session.current());
        templateBinding.put("request", Http.Request.current());
        templateBinding.put("flash", Scope.Flash.current());
        templateBinding.put("params", Scope.Params.current());
        templateBinding.put("errors", Validation.errors());
        String templateName = "";
        RenderTemplate templateRenderer = null;
        Template template = null;
        Map<String, String> renderedTemplates = new HashMap<String, String>();
        Map<String, String> templates = templates(templatesIds);
        for (String id : templatesIds) {
        	templateName = templates.get(id);
        	if (templateName == null) {
        		continue;
        	}
        	try {
        		template = TemplateLoader.load(template(templateName));
        		templateRenderer = new RenderTemplate(template, templateBinding.data);
        		renderedTemplates.put(id, templateRenderer.getContent());
	       	 } catch (TemplateNotFoundException ex) {
	       		 if (ex.isSourceAvailable()) {
	       			 throw ex;
	       		 }
	       		 StackTraceElement element = PlayException.getInterestingStrackTraceElement(ex);
	       		 if (element != null) {
	       			 throw new TemplateNotFoundException(templateName, Play.classes.getApplicationClass(element.getClassName()), element.getLineNumber());
	       		 } else {
	       			 throw ex;
	       		 }
	       	 }
        }
        renderJSON(renderedTemplates);
	}
}
