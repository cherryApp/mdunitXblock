"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources

from yaml import load, dump
try:
    from yaml import CLoader as YAMLLoader
except ImportError:
    from yaml import Loader as YAMLLoader

from xblock.core import XBlock
from xblock.fields import Integer, Scope, String
from xblock.fragment import Fragment
from xblock.runtime import IdGenerator


class mdUnit(XBlock):
    """
    TO-DO: document what your XBlock does.
    """

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.

    # TO-DO: delete count, and define your own fields.
    count = Integer(
        default=0, scope=Scope.user_state,
        help="A simple counter, to show something happening",
    )

    display_name = String(
        display_name=u"Display Name",
        default="Markdown",
        scope=Scope.settings
    )

    md_url = ""

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the mdUnit, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/mdunit.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string(
            "static/lib/bootstrap-4.3.1-dist/css/bootstrap.min.css"))
        frag.add_css(self.resource_string("static/css/mdunit.css"))
        frag.add_javascript(self.resource_string(
            "static/lib/bootstrap-4.3.1-dist/js/bootstrap.min.js"))
        frag.add_javascript(self.resource_string("static/js/src/mdunit.js"))
        frag.initialize_js('mdUnit')
        return frag

    def studio_view(self, context=None):
        self.md_url = self.runtime.local_resource_url(
            self, '/static/14_html_form.md')

        context = {
            'display_name': self.display_name,
            'md_url': self.md_url
        }

        html = self.resource_string("static/html/mdunit_edit.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string(
            "static/lib/bootstrap-4.3.1-dist/css/bootstrap.min.css"))
        frag.add_css(self.resource_string("static/css/mdunit_edit.css"))
        frag.add_javascript(self.resource_string(
            "static/lib/bootstrap-4.3.1-dist/js/bootstrap.min.js"))
        frag.add_javascript(self.resource_string(
            "static/js/src/mdunit_edit.js"))
        frag.initialize_js('mdUnitEdit')
        return frag

    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
    @XBlock.json_handler
    def increment_count(self, data, suffix=''):
        """
        An example handler, which increments the data.
        """
        # Just to show data coming in...
        assert data['hello'] == 'world'

        self.count += 1
        return {"count": self.count}

    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("mdUnit",
             """<mdunit/>
             """),
            ("Multiple mdUnit",
             """<vertical_demo>
                <mdunit/>
                <mdunit/>
                <mdunit/>
                </vertical_demo>
             """),
        ]
